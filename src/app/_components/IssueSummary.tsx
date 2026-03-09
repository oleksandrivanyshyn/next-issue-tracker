import React from 'react';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { Status } from '@/generated/prisma/enums';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issues', value: open, status: Status.OPEN },
    {
      label: 'In-Progress Issues',
      value: inProgress,
      status: Status.IN_PROGRESS,
    },
    { label: 'Closed Issues', value: closed, status: Status.CLOSED },
  ];

  return (
    <Flex gap="4">
      {containers.map(({ label, value, status }) => (
        <Card key={label} className="flex-1 hover:bg-gray-50 transition-colors">
          <Flex direction="column" gap="1">
            <Link
              href={`/issues/list?status=${status}`}
              className="text-sm font-medium"
            >
              {label}
            </Link>
            <Text size="7" weight="bold">
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
