// In frontend/Task-Manager/src/utils/apiPaths.js

// FIX: We now add the trailing slash to BASE_URL.
// This ensures the final URL structure is correct when combining with the path.
export const BASE_URL = (import.meta.env.VITE_APP_API_URL || "http://localhost:8000") + "/";

export const API_PATHS = {
  AUTH: {
    // FIX: Removed the leading '/' from the path
    REGISTER: "api/auth/register",
    LOGIN: "api/auth/login",
    GET_PROFILE: "api/auth/profile",
  },

  USERS: {
    // FIX: Removed the leading '/' from the path
    GET_ALL_USERS: "api/users",
    GET_USER_BY_ID: (userId) => `api/users/${userId}`,
    CREATE_USER: "api/users",
    UPDATE_USER: (userId) => `api/users/${userId}`,
    DELETE_USER: (userId) => `api/users/${userId}`,
  },

  TASKS: {
    // FIX: Removed the leading '/' from the path
    GET_DASHBOARD_DATA: "api/tasks/dashboard-data",
    GET_USER_DASHBOARD_DATA: "api/tasks/user-dashboard-data",
    GET_ALL_TASKS: "api/tasks",
    GET_TASK_BY_ID: (taskId) => `api/tasks/${taskId}`,
    CREATE_TASK: "api/tasks",
    UPDATE_TASK: (taskId) => `api/tasks/${taskId}`,
    DELETE_TASK: (taskId) => `api/tasks/${taskId}`,

    UPDATE_TASK_STATUS: (taskId) => `api/tasks/${taskId}/status`,
    UPDATE_TODO_CHECKLIST: (taskId) => `api/tasks/${taskId}/todo`,
  },

  REPORTS: {
    // FIX: Removed the leading '/' from the path
    EXPORT_TASKS: "api/reports/export/tasks",
    EXPORT_USERS: "api/reports/export/users",
  },

  IMAGE: {
    // This one was already missing the leading slash, so it's correct.
    UPLOAD_IMAGE: "api/auth/upload-image",
  },
};