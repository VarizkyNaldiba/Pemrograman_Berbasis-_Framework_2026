import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./navbar.module.css";

const Navbar = () => {
	const { data: session, status } = useSession();
	const { push } = useRouter();

	const handleSignOut = async () => {
		// Sign out and redirect to home
		await signOut({ 
			redirect: true,
			callbackUrl: "/"
		});
	};

	return (
		<div className={styles.navbar}>
			<div className={styles.navbar_brand}>MyApp</div>

			<div className={styles.navbar_right}>
				{status === "authenticated" && session?.user ? (
					<>
						<div className={styles.navbar_user}>
							Welcome, {(session.user as any)?.fullname || session.user?.email || "User"}
						</div>
						<button
							className={`${styles.navbar_button} ${styles["navbar_button--danger"]}`}
							onClick={handleSignOut}
						>
							Sign Out
						</button>
					</>
				) : (
					<button
						className={`${styles.navbar_button} ${styles["navbar_button--primary"]}`}
						onClick={() => push("/auth/login")}
					>
						Sign In
					</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
