
export default function ({$auth, redirect}) {
  if($auth.loggedIn) {
    if($auth.user.is_suspended == true) {
      return redirect('/suspended');
    }
  }
}
