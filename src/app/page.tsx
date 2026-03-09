import LatestIssues from '@/app/_components/LatestIssues';
import IssueSummary from '@/app/_components/IssueSummary';
import prisma from '@/lib/prisma';
import { Flex } from '@radix-ui/themes';

export default async function Home() {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: 'OPEN' } }),
    prisma.issue.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.issue.count({ where: { status: 'CLOSED' } }),
  ]);

  return (
    <Flex direction="column" gap="5">
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <LatestIssues />
    </Flex>
  );
}
