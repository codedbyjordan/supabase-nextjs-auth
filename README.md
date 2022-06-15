# Supabase & Next.js Auth

A template for getting up and running with Supabase's authentication and Next.js

## How to use

Clone the repo and create a `.env` file with the following contents

```
NEXT_PUBLIC_SUPABASE_URL="<your supabase url>"
NEXT_PUBLIC_SUPABASE_KEY="<your supabase anon key>"
```

Run `yarn dev` and go to `localhost:3000` in your browser

## Creating private routes

To create a page that is only accessible by visitors who are logged in, wrap a page in a `<ProtectedRoute>` and add `getServerSideProps`

```ts
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login" } };
  } else {
    return { props: {} };
  }
};
```

The `<ProtectedRoute>` component is fine on its own, but adding this will ensure that the user can't visit unless authenticated, even if the user somehow tampered with the client state.
