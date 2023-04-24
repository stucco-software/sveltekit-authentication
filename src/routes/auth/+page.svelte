<script type="text/javascript">
  export let data
</script>

<h1>Sign In</h1>

<form
  method="POST">
  <label>
    <p>
      Sign in with your email address.
    </p>
    <input type="email" name="email">
    {#if data.redirect}
      <input type="hidden" name="redirect" value={data.redirect}>
    {/if}
    <button>Sign In</button>
  </label>
</form>

