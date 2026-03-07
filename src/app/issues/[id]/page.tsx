import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';

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
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" my="5">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
