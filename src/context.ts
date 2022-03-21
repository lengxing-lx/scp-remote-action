import * as core from '@actions/core'

export interface Inputs {
  ipaddr: string
  username: string
  password: string
  operation_type: string
  operation_list: string[]
}

export function getInputs(): Inputs {
  return {
    ipaddr: core.getInput('ipaddr'),
    username: core.getInput('username'),
    password: core.getInput('password'),
    operation_type: core.getInput('operation_type'),
    operation_list: core.getMultilineInput('operation_list')
  }
}
