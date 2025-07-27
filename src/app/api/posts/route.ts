import { NextRequest, NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db();
    
    const posts = await db.collection('posts')
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
    
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { title, content } = await request.json();

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const client: MongoClient = await clientPromise;
    const db = client.db();

    const newPost = {
      title: title.trim(),
      content: content.trim(),
      author: session.user.name || 'Anonymous',
      authorEmail: session.user.email,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('posts').insertOne(newPost);

    return NextResponse.json(
      { message: 'Post created successfully', post: { _id: result.insertedId, ...newPost } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}