import { PrismaClient, User, Prisma } from '@prisma/client';
import { hash } from 'argon2';

// initialize Prisma Client
const prisma = new PrismaClient();

async function generateCategories() {
  const categories: Prisma.CategoryCreateManyInput[] = [
    { name: 'Laptop' },
    { name: 'Desktop' },
    { name: 'Monitor' },
    { name: 'Keyboard' },
    { name: 'Mouse' },
    { name: 'Headphone' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
}

async function generateProducts() {
  const products: Prisma.ProductCreateInput[] = [
    {
      name: 'Lenovo IdeaPad 3',
      price: 7500000,
      categories: {
        create: [
          {
            category: {
              connect: {
                id: (
                  await prisma.category.findUnique({
                    where: { name: 'Laptop' },
                  })
                ).id,
              },
            },
          },
        ],
      },
      createdBy: {
        connect: {
          id: (
            await prisma.user.findUnique({
              where: { username: 'charlie789' },
            })
          ).id,
        },
      },
    },
    {
      name: 'Dell XPS 13',
      price: 13000000,
      categories: {
        create: [
          {
            category: {
              connect: {
                id: (
                  await prisma.category.findUnique({
                    where: { name: 'Laptop' },
                  })
                ).id,
              },
            },
          },
        ],
      },
      createdBy: {
        connect: {
          id: (
            await prisma.user.findUnique({
              where: { username: 'david777' },
            })
          ).id,
        },
      },
    },
    {
      name: 'HP Envy x360',
      price: 15000000,
      categories: {
        create: [
          {
            category: {
              connect: {
                id: (
                  await prisma.category.findUnique({
                    where: { name: 'Laptop' },
                  })
                ).id,
              },
            },
          },
        ],
      },
      createdBy: {
        connect: {
          id: (
            await prisma.user.findUnique({
              where: { username: 'david777' },
            })
          ).id,
        },
      },
    },
    {
      name: 'A4Tech 24"',
      price: 25000000,
      categories: {
        create: [
          {
            category: {
              connect: {
                id: (
                  await prisma.category.findUnique({
                    where: { name: 'Monitor' },
                  })
                ).id,
              },
            },
          },
        ],
      },
    },
    {
      name: 'Logitech G502',
      price: 1500000,
      categories: {
        create: [
          {
            category: {
              connect: {
                id: (
                  await prisma.category.findUnique({
                    where: { name: 'Mouse' },
                  })
                ).id,
              },
            },
          },
        ],
      },
    },
    {
      name: 'Razer BlackWidow',
      price: 2000000,
      categories: {
        create: [
          {
            category: {
              connect: {
                id: (
                  await prisma.category.findUnique({
                    where: { name: 'Mouse' },
                  })
                ).id,
              },
            },
          },
        ],
      },
    },
    {
      name: 'Logitech G Pro',
      price: 2500000,
      categories: {
        create: [
          {
            category: {
              connect: {
                id: (
                  await prisma.category.findUnique({
                    where: { name: 'Headphone' },
                  })
                ).id,
              },
            },
          },
        ],
      },
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    });
  }
}

async function generateUsers() {
  const users: Prisma.UserCreateInput[] = [
    {
      email: 'alice@prisma.io',
      fullName: 'Alice Smith',
      password: 'P@ssw0rd',
      username: 'alice123',
      firstName: 'Alice',
      lastName: 'Smith',
      gender: 'FEMALE',
      phoneNumber: '0901234567',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: ['USER', 'SHOP'],
    },
    {
      email: 'bob@prisma.io',
      fullName: 'Bob Johnson',
      password: 'P@ssw0rd',
      username: 'bob456',
      firstName: 'Bob',
      lastName: 'Johnson',
      gender: 'MALE',
      phoneNumber: '0909876543',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: ['ADMIN', 'MANAGER'],
    },
    {
      email: 'charlie@prisma.io',
      fullName: 'Charlie Brown',
      password: 'P@ssw0rd',
      username: 'charlie789',
      firstName: 'Charlie',
      lastName: 'Brown',
      gender: 'MALE',
      phoneNumber: '0907654321',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: ['SHOP'],
    },
    {
      email: 'david@prisma.io',
      fullName: 'David Lee',
      password: 'P@ssw0rd',
      username: 'david777',
      firstName: 'David',
      lastName: 'Lee',
      gender: 'MALE',
      phoneNumber: '0900000000',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: ['MANAGER'],
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: {
        ...user,
        password: await hash(user.password),
      },
    });
  }
}

async function main() {
  await generateUsers();
  await generateCategories();
  await generateProducts();
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
