
export default function ({$auth, redirect}) {
  if($auth.loggedIn) {
    if($auth.user.email_verified_at == null) {
      return redirect('/verify-email');
    }
  }
}
