### Ordering service - Query side

These files in this folder are used to handler read query request from client-side. By completely separate read from write we no longer need to think about DDD or model's life cycle because everything's done by this read side has no side-effect.

#### Key concept
These are key components to implement query handler:
- Query handler
- View model
- DB context