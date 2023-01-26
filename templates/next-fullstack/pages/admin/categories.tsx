import AdminLayout from '@ui/admin/layout';
import React from 'react';
import { CustomNextPage } from '@libs/types/CustomNextType';

const Categories: CustomNextPage = () => {
	return <AdminLayout>Categories</AdminLayout>;
};
// set auth to true to protect this page
Categories.auth = true;

export default Categories;
