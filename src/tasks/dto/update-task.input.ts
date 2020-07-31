import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field(type => ID)
  readonly id: string;

  @Field()
  readonly completed: boolean;
}
