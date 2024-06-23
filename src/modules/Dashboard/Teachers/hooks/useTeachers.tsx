import API from '@/common/api'
import Icon from '@/common/components/Icon'
import { API_QUERY_KEYS } from '@/common/querys/keys'
import { useDisciplineQuery } from '@/common/querys/useDisciplineQuery'
import { useTeacherQuery } from '@/common/querys/useTeacherQuery'
import { Image, Teacher, TeacherReturn } from '@/common/types'
import { Chip, Grid, IconButton } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { arrayMoveImmutable } from 'array-move'
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'

const columns: GridColDef[] = [
  { field: `name`, headerName: `Nombre`, width: 200 },
  { field: `description`, headerName: `Descripción`, flex: 1 },
  {
    field: `disciplines`,
    headerName: `Disciplinas`,
    width: 200,
    renderCell: ({ row }: GridRenderCellParams<TeacherReturn>) => {
      const { disciplines } = row
      const leftDisciplines = disciplines.length - 1
      return (
        <Grid>
          {disciplines.slice(0, 1).map((discipline) => (
            <Chip
              key={discipline.uuid}
              label={discipline.name}
              size="small"
              sx={{
                marginRight: 1,
              }}
            />
          ))}
          {leftDisciplines > 0 && <Chip label={`+${leftDisciplines}`} size="small" />}
        </Grid>
      )
    },
  },
  {
    field: `actions`,
    headerName: `Acciones`,
    width: 150,
    renderCell: ({ row }: GridRenderCellParams) => {
      const actions = row.actions
      return (
        <Grid container width="fit-content" height="100%" gap={1} alignItems="center">
          <IconButton
            sx={{
              padding: 0.5,
              borderRadius: 0.5,
            }}
            onClick={actions.edit}
          >
            <Icon icon="edit" color="primary" />
          </IconButton>
          <IconButton
            sx={{
              padding: 0.5,
              borderRadius: 0.5,
            }}
            onClick={actions.delete}
          >
            <Icon icon="delete" color="error" />
          </IconButton>
        </Grid>
      )
    },
  },
]

const initialState = {
  name: ``,
  images: [],
  imagesUploaded: [],
  description: ``,
  disciplines: [],
}

const useTeachers = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState<string | null>(null)
  const [editingTeacher, setEditingTeacher] = useState<string | null>(null)
  const [isHover, setIsHover] = useState(``)
  const [state, setState] = useState<Teacher>(initialState)
  const { name, images, imagesUploaded, description, disciplines } = state
  const { data: disciplinesQuery } = useDisciplineQuery()
  const { data: teachersQuery } = useTeacherQuery()

  const { rows } = useMemo(() => {
    if (!teachersQuery?.data) {
      return { rows: [] }
    }

    const rows = teachersQuery.data.map((teacher) => {
      return {
        id: teacher.uuid,
        name: teacher.name,
        description: teacher.description,
        disciplines: teacher.disciplines,
        actions: {
          edit: () => handleOnEditClick(teacher),
          delete: () => handleOnDeleteClick(teacher.uuid),
        },
      }
    })

    return { rows }
  }, [teachersQuery])

  const handleOnEditClick = (teacher: TeacherReturn): void => {
    setState({
      name: teacher.name,
      images: [],
      imagesUploaded: teacher.imagesUploaded,
      description: teacher.description,
      disciplines: teacher.disciplines,
    })
    setEditingTeacher(teacher.uuid)
    setOpen(true)
  }

  const handleOnDeleteClick = (disciplineId: string): void => {
    setOpenDelete(disciplineId)
  }

  const handleCloseDeleteModal = (): void => {
    setOpenDelete(null)
  }

  const handleOpenDrawer = (): void => {
    setOpen(true)
  }
  const handleCloseDrawer = (): void => {
    setOpen(false)
    setState(initialState)
  }
  const onSortEnd = (oldIndex: number, newIndex: number): void => {
    const newArray = arrayMoveImmutable(images, oldIndex, newIndex)
    setState({ ...state, images: newArray })
  }
  const handleDeleteImage = (image: File | Image): void => {
    if (image instanceof File) {
      const newArray = images.filter((file) => file.name !== image.name)
      setState({ ...state, images: newArray })
      return
    }

    const newImagesUploaded = imagesUploaded.filter((file) => file.name !== image.name)
    setState({ ...state, imagesUploaded: newImagesUploaded })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target

    if (images !== null) {
      const filesToUploadNames = [...images, ...imagesUploaded].map((file) => file.name)
      let newFiles = Array.from(files || [])
      newFiles = newFiles.filter((newFile) => !filesToUploadNames.includes(newFile.name))
      const newArray = images.concat(newFiles)
      setState({ ...state, images: newArray })
    }
    event.target.value = ``
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }
  const handleSubmit = (): void => {
    const payload: Teacher = {
      name,
      description,
      images,
      imagesUploaded,
      disciplines,
    }
    if (editingTeacher) {
      updateTeacher({ payload, editingTeacher })
      return
    }
    createTeacher(payload)
  }
  const handleDeleteSubmit = (): void => {
    if (openDelete) {
      deleteTeacher(openDelete)
    }
  }
  const onMouseEnter = (name: string): void => {
    setIsHover(name)
  }
  const onMouseLeave = (): void => {
    setIsHover(``)
  }

  const queryClient = useQueryClient()

  const { mutate: createTeacher, isPending: isCreatingTeacher } = useMutation({
    mutationFn: (payload: Teacher) => API.teacher.create(payload),
    onSuccess: (data) => {
      queryClient.setQueryData<{ data: TeacherReturn[] } | undefined>(
        API_QUERY_KEYS.allTeachers,
        (oldData: { data: TeacherReturn[] } | undefined) => {
          if (!oldData?.data) {
            return { data: [] }
          }
          return {
            data: [...oldData.data, data.data],
          }
        },
      )
      handleCloseDrawer()
      enqueueSnackbar(`Profesor creado correctamente`, { variant: `success` })
    },
    onError: (error) => {
      console.error(error)
      enqueueSnackbar(`Error al crear profesor`, { variant: `error` })
    },
  })

  const { mutate: updateTeacher, isPending: isUpdatingTeacher } = useMutation({
    mutationFn: ({ payload, editingTeacher }: { payload: Teacher; editingTeacher: string }) =>
      API.teacher.update(payload, editingTeacher),
    onSuccess: (data) => {
      queryClient.setQueryData<{ data: TeacherReturn[] } | undefined>(
        API_QUERY_KEYS.allTeachers,
        (oldData: { data: TeacherReturn[] } | undefined) => {
          if (!oldData?.data) {
            return { data: [] }
          }
          const newData = oldData.data.map((teacher) => {
            if (teacher.uuid === data.data.uuid) {
              return data.data
            }
            return teacher
          })
          return {
            data: newData,
          }
        },
      )
      handleCloseDrawer()
      enqueueSnackbar(`Profesor actualizado correctamente`, { variant: `success` })
    },
    onError: (error) => {
      console.error(error)
      enqueueSnackbar(`Error al actualizar profesor`, { variant: `error` })
    },
  })

  const { mutate: deleteTeacher, isPending: isDeletingTeacher } = useMutation({
    mutationFn: (uuid: string) => API.teacher.delete(uuid),
    onSuccess: (_, uuid) => {
      queryClient.setQueryData<{ data: TeacherReturn[] } | undefined>(
        API_QUERY_KEYS.allTeachers,
        (oldData: { data: TeacherReturn[] } | undefined) => {
          if (!oldData?.data) {
            return { data: [] }
          }
          return {
            data: oldData.data.filter((teacher) => teacher.uuid !== uuid),
          }
        },
      )
      setOpenDelete(null)
      enqueueSnackbar(`Disciplina eliminada correctamente`, { variant: `success` })
    },
    onError: () => {
      enqueueSnackbar(`Error al eliminar la disciplina`, { variant: `error` })
    },
  })

  const isCreatingOrUpdating = isCreatingTeacher || isUpdatingTeacher
  const allImages = [...imagesUploaded, ...images]
  const disableSubmitButton = !name || !description || allImages.length < 1 || allImages.length > 10

  return {
    columns,
    rows,
    open,
    openDelete,
    editingTeacher,
    isHover,
    state,
    allImages,
    disciplinesQuery,
    isCreatingOrUpdating,
    isDeletingTeacher,
    disableSubmitButton,
    handleOpenDrawer,
    handleCloseDrawer,
    onSortEnd,
    handleDeleteImage,
    handleChange,
    handleInputChange,
    handleSubmit,
    onMouseEnter,
    onMouseLeave,
    setState,
    handleCloseDeleteModal,
    handleDeleteSubmit,
  }
}

export default useTeachers
