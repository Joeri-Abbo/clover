import Command from '../Command'
import React from 'react'
import {Clover, Text, render} from '@roots/clover-dashboard'

export default class Init extends Command {
  public static description = 'Clover'

  public static examples = [`$ clover`]

  public async run() {
    render(
      <Clover>
        <Text>Some content.</Text>
      </Clover>,
    )
  }
}
