import AdminLayout from '@ui/admin/layout';
import React from 'react';
import { CustomNextPage } from '@libs/types/CustomNextType';

const Settings: CustomNextPage = () => {
	return <AdminLayout>Settings</AdminLayout>;
};
Settings.auth = true;
export default Settings;
