import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Box, Flex, Grid } from '@radix-ui/themes';
import EditIssueButton from '@/app/issues/[id]/_components/EditIssueButton';
import IssueDetails from '@/app/issues/[id]/_components/IssueDetails';
import DeleteIssueButton from '@/app/issues/[id]/_components/DeleteIssueButton';
import { auth } from '@/auth';
import AssigneeSelect from '@/app/issues/[id]/_components/AssigneeSelect';

const IssueDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await auth();
  const { id } = await params;
  let issue;
  try {
    issue = await prisma.issue.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    return notFound();
  }
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

export default IssueDetailPage;
