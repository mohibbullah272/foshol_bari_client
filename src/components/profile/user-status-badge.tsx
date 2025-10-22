// components/profile/user-status-badge.tsx
import { Status, Role } from '@/types/user';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Shield, User, XCircle } from 'lucide-react';

interface UserStatusBadgeProps {
  status: Status;
  role: Role;
}

export const UserStatusBadge = ({ status, role }: UserStatusBadgeProps) => {
  const getStatusConfig = (status: Status) => {
    const configs = {
      [Status.PENDING]: {
        label: 'বিচারাধীন',
        variant: 'secondary' as const,
        icon: Clock,
        color: 'text-amber-600'
      },
      [Status.APPROVED]: {
        label: 'অনুমোদিত',
        variant: 'default' as const,
        icon: CheckCircle,
        color: 'text-green-600'
      },
      [Status.BLOCKED]: {
        label: 'ব্লক করা হয়েছে',
        variant: 'destructive' as const,
        icon: XCircle,
        color: 'text-red-600'
      },
    };
    return configs[status];
  };

  const getRoleConfig = (role: Role) => {
    const configs = {
      [Role.INVESTOR]: {
        label: 'বিনিয়োগকারী',
        variant: 'outline' as const,
        icon: User,
        color: 'text-blue-600'
      },
      [Role.ADMIN]: {
        label: 'অ্যাডমিন',
        variant: 'default' as const,
        icon: Shield,
        color: 'text-purple-600'
      },
    };
    return configs[role];
  };

  const statusConfig = getStatusConfig(status);
  const roleConfig = getRoleConfig(role);
  const StatusIcon = statusConfig.icon;
  const RoleIcon = roleConfig.icon;

  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant={statusConfig.variant} className="flex items-center gap-1">
        <StatusIcon className="h-3 w-3" />
        {statusConfig.label}
      </Badge>
      <Badge variant={roleConfig.variant} className="flex items-center gap-1">
        <RoleIcon className="h-3 w-3" />
        {roleConfig.label}
      </Badge>
    </div>
  );
};