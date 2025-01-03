export const userRoles = {
  admin: {
    label: 'Admin',
    value: 'admin'
  },
  lecturers: {
    label: 'Dosen',
    value: 'lecturer'
  },
  students: {
    label: 'Siswa',
    value: 'student'
  }
}

export const userRolesArray = Object.values(userRoles)

export const getUserRoleLabelFromValue = (value: string) => {
  const role = userRolesArray.find((role) => role.value === value)
  return role?.label || ''
}
