import type { OpeningHours } from '~/types/City';

export const useDayGetter = () => {
    const todayIndex = new Date().getDay();
    const dayMap = [
    "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
    ];

    const todayKey = dayMap[todayIndex];

    const getTodayOpeningHours = (openingHours: OpeningHours) => {
        const currentDay = openingHours[todayKey as keyof OpeningHours];

        if (!currentDay) return 'Zamknięte';
    
        return `${currentDay.open} - ${currentDay.close}`
    }

    return {
        todayKey,
        getTodayOpeningHours
    }
}