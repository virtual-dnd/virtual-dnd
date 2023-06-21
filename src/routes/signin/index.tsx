// TODO: Add sign in with Google and Discord

export default function Signin() {
  return (
    <div>
      <h1>Sign In</h1>

      <div>
        <form>
          <label html-for="email">Email</label>
          <input type="email" id="email" name="email" />
          <button type="submit">Sign in</button>
        </form>
      </div>

      <div>
        <form>
          <button type="submit" value="google">
            Sign in with Google
          </button>
        </form>
      </div>

      <div>
        <form>
          <button type="submit" value="discord">
            Sign in with Discord
          </button>
        </form>
      </div>
    </div>
  )
}
