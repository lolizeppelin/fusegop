/**
 * Authorization Roles
 */

const authRoles = {
    admin    : ['admin'],
    staff    : ['admin', 'staff'],
    user     : ['admin', 'staff', 'user'],
    fluttercomic0manager    : ['admin', 'fluttercomic0manager'],
    fluttercomic0user     : ['admin', 'fluttercomic0manager', 'fluttercomic0user'],
    onlyGuest: ['guest']
};

export default authRoles;

