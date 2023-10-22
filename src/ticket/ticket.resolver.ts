import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TicketResolver {
  @Query(() => String,{ description:"Hola mundo", name:"helloworld"})
  helloWorld(): string {
    return 'Hola mundo';
  }
}
