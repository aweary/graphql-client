# Traversal steps


1. `graphql-tag` tags takes the query string and parses it into a query AST.
2. The query AST is traversed, generating a normalized ID for each
   `field`/`selectionSet`
3. The normalized ID is referenced against the current store data to see
   if we already have that field
4. If we already have the field we remove that field from the query AST
