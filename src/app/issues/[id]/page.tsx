import React, { cache } from 'react';
import prisma from '@/lib/prisma';
import { Box, Flex, Grid } from '@radix-ui/themes';
import EditIssueButton from '@/app/issues/[id]/_components/EditIssueButton';
import IssueDetails from '@/app/issues/[id]/_components/IssueDetails';
import DeleteIssueButton from '@/app/issues/[id]/_components/DeleteIssueButton';
import { auth } from '@/auth';
import AssigneeSelect from '@/app/issues/[id]/_components/AssigneeSelect';
import { notFound } from 'next/navigation';

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } }),
);
const IssueDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await auth();
  const { id } = await params;
  const issue = await fetchUser(parseInt(id));
  if (!issue) return notFound();
  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue}></IssueDetails>
      </Box>
      <Box>
        {session && (
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issue = await fetchUser(parseInt(id));
  return {
    title: issue?.title,
    description: 'Details of issue  ' + issue?.id,
  };
}
export default IssueDetailPage;
