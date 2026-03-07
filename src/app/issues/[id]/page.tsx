import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface IssueDetailPageProps {
  params: Promise<{ id: string }>;
}
const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
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
        <Heading>{issue.title}</Heading>
        <Flex gap="2" my="5">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
