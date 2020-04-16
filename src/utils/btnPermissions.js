
export function hasPermission (perm) {
  let permissionBtns = JSON.parse(sessionStorage.getItem('btnPermissions'))
  let btnName = permissionBtns.map(res => {
    return res.menuName
  })
  return btnName.indexOf(perm) > -1
}
