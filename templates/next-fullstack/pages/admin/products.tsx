import AdminLayout from '@ui/admin/layout';
import React from 'react';
import { CustomNextPage } from '@libs/types/CustomNextType';

const Products: CustomNextPage = () => {
	return <AdminLayout>Products</AdminLayout>;
};
Products.auth = true;
export default Products;
