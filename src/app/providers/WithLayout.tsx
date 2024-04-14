import React from 'react';
import Layout from 'shared/ui/Layout/Layout';
import {Appbar} from "widgets/Appbar";

const WithLayout = ({children }: { children: React.ReactNode }) => {
    return (
        <Layout appbar={<Appbar/>} footer={<div />}>
            {children}
        </Layout>
    );
};

export default WithLayout;
