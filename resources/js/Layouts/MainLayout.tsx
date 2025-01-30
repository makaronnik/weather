import Header from '@/Components/Header';
import AppTheme from '@/theme/AppTheme';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
    // return (
    //     <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
    //         <div>
    //             <Link href="/">
    //                 <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
    //             </Link>
    //         </div>
    //
    //         <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
    //             {children}
    //         </div>
    //     </div>
    // );
    return (
        <AppTheme>
            <CssBaseline enableColorScheme />

            <Header />

            <Container
                maxWidth="lg"
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    my: 12,
                }}
            >
                {children}
            </Container>
        </AppTheme>
    );
}
