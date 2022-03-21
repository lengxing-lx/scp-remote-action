import * as core from '@actions/core'
import * as cp from 'child_process'
import * as context from './context'

/**
 *      sshpass -p ${{ secrets.CCE_PASSWORD }}  scp  -o StrictHostKeyChecking=no  target/demoapp.jar root@182.92.156.203:/usr/local/
        sshpass -p ${{ secrets.CCE_PASSWORD }}  scp  -o StrictHostKeyChecking=no  bin/demoapp.service root@182.92.156.203:/etc/systemd/system/
 */
export async function execRemoteSSHCommands(
  inputs: context.Inputs
): Promise<void> {
  for (var i = 0; i < inputs.operation_list.length; i++) {
    core.info('exec command:' + inputs.operation_list[i])
    let sshpassCommand =
      'sshpass -p ' +
      inputs.password +
      ' ssh -o StrictHostKeyChecking=no ' +
      inputs.username +
      '@' +
      inputs.ipaddr +
      " '" +
      inputs.operation_list[i] +
      "'"
    await execRemoteSSHCommand(sshpassCommand)
  }
}

/**
 *
 * @param sshcommand 执行远程命令
 */
export async function execRemoteSSHCommand(sshcommand: string): Promise<void> {
  let sshpassCommandResult = await (cp.execSync(sshcommand) || '').toString()
  core.info('result ' + sshpassCommandResult)
}

export function genScpCommand(scplist:string,ipaddr:string,ops_type:string,username:string) : string{
  let scpCommand = "";
  const fileArray:string[] = scplist.split(" ");
  let scptype = fileArray[0];
  let fromPath = fileArray[1];
  let distPath = fileArray[2];


  if(scptype === "dir"){
    scpCommand += " -r "
  }

  if(ops_type === "upload"){
    scpCommand += fromPath + " " + username + "@" + ipaddr+":" + distPath
  }
  if(ops_type === "download"){
    scpCommand +=  username + "@" + ipaddr+":" + fromPath+ " " + fromPath
  }

  return "scpCommand";
}

export function genUloadComman(inputs: context.Inputs) : string{
  for (var i = 0; i < inputs.operation_list.length; i++) {
    core.info('exec command:' + inputs.operation_list[i])
    let sshpassCommand =
      'sshpass -p ' +
      inputs.password +
      ' ssh -o StrictHostKeyChecking=no ' + genScpCommand(inputs.operation_list[i],inputs.ipaddr,inputs.operation_type,inputs.username)
  }
  return "";
}

export function genDownloadComman(inputs: context.Inputs) : string{
  for (var i = 0; i < inputs.operation_list.length; i++) {
    core.info('exec command:' + inputs.operation_list[i])
    let sshpassCommand =
      'sshpass -p ' +
      inputs.password +
      ' ssh -o StrictHostKeyChecking=no ' +
      inputs.username +
      '@' +
      inputs.ipaddr +
      " '" +
      inputs.operation_list[i] +
      "'"
  }
  return "";
}