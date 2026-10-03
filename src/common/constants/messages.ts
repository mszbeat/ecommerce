import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const RESPONSE_MESSAGES = {
  AUTH: {
    register: (data: object) => ({
      message: {
        en: 'User created successfully',
        fa: 'کاربر با موفقیت ایجاد شد',
      },
      data,
    }),
    login: (data: object) => ({
      message: {
        en: 'Login successful',
        fa: 'با موفقیت وارد شدید',
      },
      data,
    }),
    refreshToken: (data: object) => ({
      message: {
        fa: 'توکن جدبد با موفقیت ساخته شد',
        en: 'Token refreshed successfully',
      },
      data,
    }),
    logout: {
      message: {
        en: 'Logged out successfully',
        fa: 'با موفقیت خارج شد',
      },
    },
    getMe: (data: object) => ({
      message: {
        en: 'Profile retrieved successfully',
        fa: 'پروفایل با موفقیت بازیابی شد',
      },
      data,
    }),
  },
  USERS: {
    create: (data: object) => ({
      message: {
        en: 'User created successfully',
        fa: 'کاربر با موفقیت ایجاد شد',
      },
      data,
    }),
    findOne: (data: object) => ({
      message: {
        fa: 'کاربر با موفقیت بازیابی شد',
        en: 'User retrieved successfully',
      },
      data,
    }),
    updateUser: (data: object) => ({
      message: {
        fa: 'کاربر با موفقیت به‌روزرسانی شد',
        en: 'User updated successfully',
      },
      data,
    }),
    deleteUser: {
      message: {
        fa: 'کاربر با موفقیت حذف شد',
        en: 'User deleted successfully',
      },
    },
    changePassword: {
      message: {
        fa: 'رمز عبور با موفقیت به‌روزرسانی شد',
        en: 'Password updated successfully',
      },
    },
  },
  TICKETS: {
    create: (data: object) => ({
      message: {
        en: 'New ticket created successfully',
        fa: 'تیکت جدید با موفقیت ایجاد شد',
      },
      data,
    }),
    findOne: (data: object) => ({
      message: {
        fa: 'تیکت با موفقیت بازیابی شد',
        en: 'Ticket retrieved successfully',
      },
      data,
    }),
    findAll: (data: object) => ({
      message: {
        fa: 'لیست تیکت ها با موفقیت بازیابی شد',
        en: 'Tickets list retrieved successfully',
      },
      data,
    }),
  },
};

export const ERROR_MESSAGES = {
  AUTH: {
    invalidCredentials: new BadRequestException({
      message: {
        en: 'Invalid credentials',
        fa: 'اطلاعات ورود نامعتبر است',
      },
    }),
    invalidSessionOrToken: new UnauthorizedException({
      message: {
        en: 'Invalid session or refresh token',
        fa: 'جلسه یا توکن تازه‌سازی نامعتبر است',
      },
    }),
    throttlerException: {
      message: {
        en: 'Too many requests',
        fa: 'درخواست‌های بیش از حد',
      },
    },
    accessDenied: new ForbiddenException({
      message: {
        en: 'Access denied',
        fa: 'دسترسی مجاز نیست',
      },
    }),
    unAuthorized: new UnauthorizedException({
      fa: 'لطفاً وارد شوید',
      en: 'Unauthorized',
    }),
  },
  USERS: {
    emailAlreadyExists: new ConflictException({
      message: {
        en: 'Email already exists',
        fa: 'ایمیل قبلاً استفاده شده است',
      },
    }),
    userNotFound: new NotFoundException({
      message: {
        en: 'User not found',
        fa: 'کاربر یافت نشد',
      },
    }),
    conflictPassword: new ConflictException({
      message: {
        en: 'New password cannot be the same as the current password',
        fa: 'رمز عبور جدید نمی‌تواند با رمز عبور فعلی یکسان باشد',
      },
    }),
    wrongPassword: new BadRequestException({
      message: {
        en: 'password is incorrect',
        fa: 'رمز عبور نادرست است',
      },
    }),
  },
  INTERNAL_ERROR: (error: object) => {
    throw new InternalServerErrorException(error);
  },
  TICKETS: {
    notFound: new NotFoundException({
      message: {
        en: 'Ticket not found',
        fa: 'تیکت یافت نشد',
      },
    }),
    conflict:new ConflictException({
      message:{
        fa:'نمی توان روی پیام ریپلای، ریپلای زد.',
        en:'You cannot reply to a reply message.'
      }
    })
  },
  COMMENTS: {
    commentNotFound: new NotFoundException({
      message: {
        en: 'Comment not found',
        fa: 'کامنت یافت نشد',
      },
    }),
  },
  CATEGORIES: {
    categoryNotFound: new NotFoundException({
      message: {
        en: 'Category not found',
        fa: 'دسته‌بندی یافت نشد',
      },
    }),
    categoryAlreadyExists: new ConflictException({
      message: {
        en: 'Category already exists',
        fa: 'دسته‌بندی قبلاً ایجاد شده است',
      },
    }),
    categoriesNotFound: new NotFoundException({
      message: {
        en: 'One or more categories not found',
        fa: 'یک یا چند دسته‌بندی یافت نشد',
      },
    }),
  },
};
