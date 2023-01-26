import { PrismaClient, Filter } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
async function main() {
	console.log(`Start seeding ...`);
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();
	await prisma.filterOption.deleteMany();
	await prisma.filter.deleteMany();
	await prisma.filterOption.deleteMany();
	await prisma.productVariation.deleteMany();
	await prisma.productVariationFilterOptions.deleteMany();

	for (let i = 0; i < 5; i++) {
		const category = await prisma.category.create({
			data: {
				name: faker.commerce.department()
			}
		});
		let arr = new Array(3).fill(0);
		for (let j = 0; j < 10; j++) {
			const productName = faker.commerce.productName();
			await prisma.product.create({
				data: {
					name: productName,
					description: faker.commerce.productDescription(),
					categoryId: category.id,
					ProductVariation: {
						create: arr.map(() => {
							let arr2 = new Array(4).fill(0);
							return {
								name: productName,
								price: Number(faker.commerce.price(100, 200)),
								quantity: Number(faker.random.numeric(2)),
								SKU: faker.random.alphaNumeric(10),
								ProductVariationFilterOptions: {
									create: arr2.map(() => {
										const filter = faker.helpers.arrayElement([
											'Storage',
											'Color',
											'RAM',
											'Operating System',
											'Book Format',
											'Authors'
										]);
										let filterOption = '';
										if (filter == 'RAM') {
											filterOption = faker.helpers.arrayElement([
												'2GB',
												'4GB',
												'8GB',
												'16GB',
												'32GB'
											]);
										} else if (filter == 'Storage') {
											filterOption = faker.helpers.arrayElement([
												'16GB',
												'32GB',
												'64GB',
												'128GB',
												'256GB'
											]);
										} else if (filter == 'Color') {
											filterOption = faker.helpers.arrayElement([
												'Black',
												'White',
												'Blue',
												'Green',
												'Red'
											]);
										} else if (filter == 'Operating System') {
											filterOption = faker.helpers.arrayElement(['Windows', 'Linux', 'Mac OS']);
										} else if (filter == 'Book Format') {
											filterOption = faker.helpers.arrayElement([
												'PaperBack',
												'HardCover',
												'E-Book'
											]);
										} else if (filter == 'Authors') {
											filterOption = faker.name.fullName();
										}
										return {
											filterOption: {
												create: {
													option_value: filterOption,
													Filter: {
														create: {
															name: filter,
															categoryId: category.id
														}
													}
												}
											}
										};
									})
								}
							};
						})
					}
				}
			});
		}
	}
	/*
 await prisma.products.create({
   data: {
    name: faker.commerce.productName(),
    price: Number(faker.random.numeric(2)),
    category: {
     create: {
      name: faker.commerce.department()
     }
    }
   }
  });

 */
	console.log(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
