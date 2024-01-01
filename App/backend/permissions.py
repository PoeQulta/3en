from rest_framework.permissions import BasePermission
class IsStaffUser(BasePermission):
    """
    Allows access only to Staff users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_staff