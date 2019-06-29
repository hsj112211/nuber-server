const privateResolver = resolverFunction => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.users) {
    throw new Error("No JWT. I refuse to proceed");
  }
  const resolver = await resolverFunction(parent, args, context, info);
  return resolver;
};

export default privateResolver;
