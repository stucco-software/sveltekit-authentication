# Sign In / Authentication

Pushbroom uses a password-less, magic-link style login system. Since all authentication processes devolve into e-mail based identification and control at the end of the day, might as well just cut to the chase and identify users by their emails. The basic workflow looks like this:

1. Enter email into sign in page.
	a. Allow the user to opt for a sign up.
2. Validate that a user with that email exist.
	a. If it doesn't, redirect to an error page with a sign up.
3. Send an email to that user with a temporary access code attached to a link.
4. User clicks the link in their email.
5. On page load, the validate that the access code is legit. 
	a. If the code is malformed,
	b. If the code is expired,
	c. Message the error and provide a new sign in form.
6. Redirect to the `/app` route, attaching an authentication cookie.
7. Delete the temporary access code.

## User Authentication and Access Ontology

This ontology is a little out of date, some additional things have been added and a few words have changed.

- An `Agent` is a subject, identified by an email address. 
- An `Agent` can be the `sameAs` another `Agent`. 
- An `Agent` can be `partOf` an `Organization`.
- Either an `Agent` or an `Organization` `manages` a `Domain`.
- An `Agent` `manages` every `Domain` than their parent `Organization` `manages`.
- An `Agent` may have an `temporaryAuthCode`.
- A `temporaryAuthCode` has a `value` and an `expiration`. 

## Spec

- ✅ Arriving on a restrited route without a cookie or knock token
	- ✅ Redirects the user to the `auth` page
	- ✅Entering an email address redirects to the `email-sent` page
		- ✅ unless it redirects to the `email-failed` page
		- ✅ Unless that email is not in the database, redirect to `no-user`
	- ✅ The email sent contains a link to the original restricted route with a knock token in the query param

- ✅ When arriving on a restricted route, if there is no cookie but there _is_ a knock token
	- ✅ Validate the knock token
		- ✅ If it's bad, redirect to `knock-bad`
	- ✅ Grab the knock token from the database
		- ✅ If it's not in there, redirect to `knock-not-found`
		- ✅ delete the knock token.
	- ✅ Peek the knock expiriry timestamp.
		- ✅ If its _in the past_ redirect to `knock-expired`
	- ✅Generate a new cookie.
		- ✅ id
		- ✅ attachedTo: user
		- ✅ createdAt: datetime now
		- ✅ expires
	- ✅ Add cookie to DB
	- ✅ Update user loginRecorded time
	- ✅ Redirect to the restricted route with the cookie in place

- ✅ When on _any_ route with a cookie
	- ✅ Ensure the cookie is not malformed
		- ✅ If its fucked up, redirect to `cookie-bad`
	- ✅ Check to see if the cookie is extant
		- ✅ If the cookie is not in the database, redirect to `cookie-not-found`
	- ✅ Check if the cookie is stale
		- ✅ if it is, rip the cookie off the response
		- delete the cookie from the db
	- ✅ If cookie is good and extant and fresh, do nothing.

- ✅ Post to the `logout` route your cookie
	- ✅ Delete the cookie from the browser
	- Delete the cookie from the database?
	- ✅ Redirect to the root page.

Knock tokens and cookies are just UUIDs. They live in the database as `urn:uuid:<uuid>` so you have to ask for that.

You can verify them with a function like this:

```
const validateUUID = (uuid) => {
	// I found this regex on stackoverflow
  let isUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  return !!isUUID.test(uuid)
}

validateUUID(uuid)
```

## Views

Adapted from https://github.com/doriantaylor/rb-forget-passwords

### 401 Not Authorized

- No Knock-Knock
- No Cookie

### 409 Knock Bad

- Knock token malformed

### 409 Knock Not Found

- Knock token not present in database

### Knock Expired

- Knock token issued longer then 10 minutes ago

### 409 Cookie Bad

- Authentication cookie malformed

### 409 Cookie Not Found

- Cookie not present in the database

### Cookie Expired

- Cookie is no longer valid.

### No User

- The user attached to this cookie no longer exists in the DB.
- The email submitted does not exist as a user.

### Email Failed

- Somehow the email didn't get out the door.

### Email Sent

- Success, check your email!