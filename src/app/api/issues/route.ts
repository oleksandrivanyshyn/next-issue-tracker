import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { issueSchema } from '@/schemas/validationSchemas';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = issueSchema.safeParse(body);
  if (!parsedBody.success) {
    return Response.json(parsedBody.error.issues, { status: 400 });
  }
  const newIssue = await prisma.issue.create({ data: parsedBody.data });
  return Response.json(newIssue, { status: 201 });
}
