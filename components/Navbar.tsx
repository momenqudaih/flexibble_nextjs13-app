import { NavLinks } from '@/constants';

import Image from 'next/image';
import Link from 'next/link';
import { AuthProviders, ProfileMenu } from './';
import { getCurrentUser } from '@/lib/session';
import { signOut } from 'next-auth/react';

const Navbar = async () => {
    const session = await getCurrentUser();

    return (
        <nav className="flexBetween navbar">
            <div className="flex-1 flexStart">
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        width={125}
                        height={47}
                        alt="InspiroShot Logo"
                        className="mr-10"
                    />
                </Link>
                <ul className="xl:flex hidden text-small gap-7">
                    {NavLinks.map((link) => (
                        <Link href={link.href} key={link.key}>
                            {link.text}
                        </Link>
                    ))}
                </ul>
            </div>

            <div className="flexCenter gap-4">
                {session?.user ? (
                    <>
                        <ProfileMenu session={session} />
                        <Link href="/create-project">Share work</Link>
                    </>
                ) : (
                    <AuthProviders />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
