import React from 'react';
import { Skeleton, Table } from '@radix-ui/themes';
import { Issue } from '@/generated/prisma/client';
import IssueStatusBadge from '@/components/IssueStatusBadge';
import Link from '@/components/Link';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

export const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

interface IssueTableProps {
  issues: Issue[];
  searchParams: { orderBy?: keyof Issue; [key: string]: string | undefined };
}

const IssueTable = ({ issues, searchParams }: IssueTableProps) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{ query: { ...searchParams, orderBy: column.value } }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline ml-1" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.RowHeaderCell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const IssueTableSkeleton = () => {
  const rows = [1, 2, 3, 4, 5];
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row}>
            <Table.RowHeaderCell>
              <Skeleton>Issue Title Placeholder</Skeleton>
              <div className="block md:hidden">
                <Skeleton>Status</Skeleton>
              </div>
            </Table.RowHeaderCell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton>Status Badge</Skeleton>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton>Date Placeholder</Skeleton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
