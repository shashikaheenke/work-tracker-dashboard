export function getUniqueValues(items, key) {
  return ['All', ...new Set(items.map((item) => item[key]))];
}

export function countBy(items, key) {
  return items.reduce((accumulator, item) => {
    accumulator[item[key]] = (accumulator[item[key]] || 0) + 1;
    return accumulator;
  }, {});
}

export function getCompletionPercentage(item) {
  if (!item.estimatedHours) return 0;
  return Math.min(Math.round((item.completedHours / item.estimatedHours) * 100), 100);
}

export function getDashboardStats(items) {
  const totalItems = items.length;
  const completedItems = items.filter((item) => item.status === 'Completed').length;
  const overdueItems = items.filter((item) => item.status === 'Overdue').length;
  const blockedItems = items.filter((item) => item.status === 'Blocked').length;
  const totalEstimatedHours = items.reduce((sum, item) => sum + item.estimatedHours, 0);
  const totalCompletedHours = items.reduce((sum, item) => sum + item.completedHours, 0);
  const completionRate = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;

  return {
    totalItems,
    completedItems,
    overdueItems,
    blockedItems,
    totalEstimatedHours,
    totalCompletedHours,
    completionRate,
  };
}
