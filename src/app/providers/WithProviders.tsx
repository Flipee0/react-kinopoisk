import React from 'react';
import WithRouter from "./WithRouter";
import WithLayout from "./WithLayout";
import WithTheme from "./WithTheme";
import WithQuery from "./WithQuery";

export const WithProviders = ({children }: { children: React.ReactNode }) => {
    return (
        <WithQuery>
            <WithTheme>
                <WithRouter>
                    <WithLayout>
                        {children}
                    </WithLayout>
                </WithRouter>
            </WithTheme>
        </WithQuery>
    );
};
