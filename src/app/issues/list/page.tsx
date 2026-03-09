import React from 'react';
import { Table } from '@radix-ui/themes';
import prisma from '@/lib/prisma';
import IssueStatusBadge from '@/components/IssueStatusBadge';
import IssueActions from '@/app/issues/list/_components/IssueActions';
import Link from '@/components/Link';
import { Status } from '@/generated/prisma/enums';

interface Props {
  searchParams: Promise<{ status?: Status }>;
}
const IssuesPage = async ({ searchParams }: Props) => {
  const { status } = await searchParams;
  const statuses = Object.values(Status);

  const validatedStatus = statuses.includes(status as Status)
    ? (status as Status)
    : undefined;
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'asc' },
    where: { status: validatedStatus },
  });
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
