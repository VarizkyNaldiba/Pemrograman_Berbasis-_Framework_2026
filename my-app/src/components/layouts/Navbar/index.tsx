import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./navbar.module.css";


const Navbar = () => {
	const { data: session, status } = useSession();
	const { push } = useRouter();
	const displayName =
		(session?.user as any)?.fullname ||
		session?.user?.name ||
		session?.user?.email ||
		"User";

	const handleSignOut = async () => {
		// Sign out and redirect to home
		await signOut({ 
			redirect: true,
			callbackUrl: "/"
		});
	};

	return (
		<div className={styles.navbar}>
			<div className={styles.navbar__brand}>MyApp</div>

			<div className={styles.navbar_right}>
				{status === "loading" ? (
					<button
						className={`${styles.navbar_button} ${styles["navbar_button--primary"]}`}
						disabled
					>
						Loading...
					</button>
				) : status === "authenticated" ? (
					<>
						<div className={styles.navbar_user}>
							Welcome, {displayName}
							<Image
								src={session?.user?.image || `https://ui-avatars.com/api/?name=${displayName}`}
								alt={displayName}
								className={styles.navbar_user__image}
								width={50}
								height={50}
								unoptimized={!session?.user?.image}
							/>
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
