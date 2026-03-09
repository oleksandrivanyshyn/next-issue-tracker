import React from 'react';
import { Table } from '@radix-ui/themes';
import prisma from '@/lib/prisma';
import IssueStatusBadge from '@/components/IssueStatusBadge';
import IssueActions from '@/app/issues/list/_components/IssueActions';
import Link from '@/components/Link';
import { Status } from '@/generated/prisma/enums';
import { Issue } from '@/generated/prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
  searchParams: Promise<{ status?: Status; orderBy: keyof Issue }>;
}
const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    {
      label: 'Issue',
      value: 'title',
    },
    {
      label: 'Status',
      value: 'status',
      className: 'hidden md:table-cell',
    },
    {
      label: 'Created',
      value: 'createdAt',
      className: 'hidden md:table-cell',
    },
  ];
  const statuses = Object.values(Status);
  const orderBy = columns
    .map((column) => column.value)
    .includes(params.orderBy as keyof Issue)
    ? { [params.orderBy!]: 'asc' }
    : undefined;
  const status = statuses.includes(params.status as Status)
    ? (params.status as Status)
    : undefined;
  const issues = await prisma.issue.findMany({
    orderBy,
    where: { status },
  });
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...params, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>

                {column.value === params.orderBy && (
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
    </div>
  );
};
export const dynamic = 'force-dynamic';
export default IssuesPage;
