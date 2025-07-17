export function validateIp(ip) {
  const ipRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

  if(ipRegex.test(ip)) {
    return true
  }

  alert('You have to enter a valid IP address')
  return false
}