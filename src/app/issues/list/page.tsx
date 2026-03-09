import React from 'react';
import prisma from '@/lib/prisma';
import IssueActions from '@/app/issues/list/_components/IssueActions';
import { Status } from '@/generated/prisma/enums';
import { Issue } from '@/generated/prisma/client';
import Pagination from '@/components/Pagination';
import IssueTable, { columns } from '@/app/issues/list/_components/IssueTable';
import { Flex } from '@radix-ui/themes';

interface Props {
  searchParams: Promise<{
    status?: Status;
    orderBy: keyof Issue;
    page: string;
  }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const statuses = Object.values(Status);
  const orderBy = columns
    .map((column) => column.value)
    .includes(params.orderBy as keyof Issue)
    ? { [params.orderBy!]: 'asc' }
    : undefined;
  const status = statuses.includes(params.status as Status)
    ? (params.status as Status)
    : undefined;
  const where = { status };

  const page = parseInt(params.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    orderBy,
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="5">
      <IssueActions />
      <IssueTable issues={issues} searchParams={params} />
      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues.',
};
export default IssuesPage;
