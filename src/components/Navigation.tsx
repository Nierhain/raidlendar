import {
    Center,
    createStyles,
    Navbar,
    Stack,
    Tooltip,
    UnstyledButton,
} from "@mantine/core";
import {
    IconHome2,
    IconLogin,
    IconLogout,
    IconSwitchHorizontal,
    TablerIcon,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.white,
        opacity: 0.85,

        "&:hover": {
            opacity: 1,
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({
                    variant: "filled",
                    color: theme.primaryColor,
                }).background!,
                0.1
            ),
        },
    },

    active: {
        opacity: 1,
        "&, &:hover": {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({
                    variant: "filled",
                    color: theme.primaryColor,
                }).background!,
                0.15
            ),
        },
    },
}));

interface NavbarLinkProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    return (
        <Tooltip label={label} position="right" transitionDuration={0}>
            <UnstyledButton
                onClick={onClick}
                className={cx(classes.link, { [classes.active]: active })}>
                <Icon stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const routes = [{ icon: IconHome2, label: "Home" }];

export function Navigation() {
    const [active, setActive] = useState(0);
    const { data, status } = useSession();

    const links = routes.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

    return (
        <Navbar
            height="100vh"
            width={{ base: 100 }}
            p="md"
            sx={(theme) => ({
                backgroundColor: theme.fn.variant({
                    variant: "filled",
                    color: theme.primaryColor,
                }).background,
            })}>
            <Center>Raidlendar</Center>
            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={0}>
                    {links}
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                    {status === "authenticated" && (
                        <NavbarLink icon={IconLogout} label="Logout" />
                    )}
                    {status === "unauthenticated" && (
                        <NavbarLink icon={IconLogin} label="Login" />
                    )}
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}
