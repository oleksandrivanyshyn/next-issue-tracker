import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Box, Grid } from '@radix-ui/themes';
import EditIssueButton from '@/app/issues/[id]/_components/EditIssueButton';
import IssueDetails from '@/app/issues/[id]/_components/IssueDetails';

const IssueDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
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
    <Grid columns={{ initial: '1', md: '2' }} gap="5" className="max-w-xl">
      <Box>
        <IssueDetails issue={issue}></IssueDetails>
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
