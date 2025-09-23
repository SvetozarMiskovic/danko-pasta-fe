import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router'

export const useSearchParams = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const defaults = {page: 1, limit: 20, search: ""}

    const updateSearchParams = useCallback((newParams: Record<string, string | number | undefined>)=>{
        const searchParams = new URLSearchParams(location.search)

        Object.entries(newParams).forEach(([key, value])=>{
            if(value === undefined || value === null || value === ""){
                searchParams.delete(key)
            } else {
                searchParams.set(key, String(value))
            }
        })

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
        return `${location.pathname}?${searchParams.toString()}`
    },[location, navigate])
    
  const searchParams = new URLSearchParams(location.search);

  const page = parseInt(searchParams.get("page") || "") || defaults.page;
  const limit = parseInt(searchParams.get("limit") || "") || defaults.limit;
  const search = searchParams.get("search") || defaults.search

    return {updateSearchParams, page, limit, search}
}