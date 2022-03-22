import * as scp from '../src/remotescp'
import * as context from '../src/context'
import {expect, test} from '@jest/globals'

const inputs: context.Inputs = {
    ipaddr: '182.92.156.203',
    username: 'root',
    password: '**********',
    operation_type: "upload",
    operation_list: ["dir /Users/a/opensource/scp-remote-action /usr/local/wwww/","file /Users/a/opensource/scp-remote-action/package-lock.json /usr/local/nodesrc/"]
}

test('check remote',()=>{
  scp.execRemoteScpCommands(inputs);  
})