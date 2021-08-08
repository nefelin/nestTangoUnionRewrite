import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useContext, useEffect, useState } from 'react';
import * as React from 'react';
import BaseTable, { AutoResizer } from 'react-base-table';
import { createPortal } from 'react-dom';

import { PlaylistTrack } from '../../hooks/state/usePlaylistsState/types';
import { tupleIdFromPlaylistTrack } from '../../hooks/state/usePlaylistsState/util';
import { usePlaylistState } from '../../hooks/state/usePlaylistState';
import { useSelectionState } from '../../hooks/state/useSelectionState';
import useKeyboardShortcut from '../../hooks/useKeyboardShortcut';
import { Maybe } from '../../types/utility/maybe';
import { playlistRowRenderer } from './DraggableTrack';
import { PlaylistContainer, TableContainer } from './PlaylistBody/styles';
import TrackCountOverlay from './PlaylistBody/TrackCountOverlay';
import { moveMany } from './PlaylistBody/util';
import playlistColumns from './playlistColumns';

const PlaylistBody = ({ tracks  }: { tracks: Maybe<Array<PlaylistTrack>>}) => {
  const { isSelected, selected, removeSelected } = useSelectionState();
  const { rearrangeTracks, removeTracks } = usePlaylistState('quicklist');
  const [orderedTracks, setOrderedTracks] = useState(tracks ?? []);
  const trackIds = orderedTracks.map(tupleIdFromPlaylistTrack);

  useKeyboardShortcut(['Backspace', 'Delete'], () => {removeTracks(...selected); removeSelected(...selected)})

  useEffect(() => setOrderedTracks(tracks ?? []), [tracks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 15 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [dragging, setDragging] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over?.id || !active.id) {
      return;
    }

    const activeIndex = trackIds.findIndex(id => id[1] === active.id);
    const overIndex = trackIds.findIndex(id => id[1] === over?.id);

    if (!isSelected(over.id)) {
      rearrangeTracks(
        moveMany(trackIds, selected, over.id, overIndex > activeIndex),
      );
    }

    // const { active, over } = event;
    // setDragging(false);
    //
    // if (active && over && active.id !== over.id) {
    //   const oldIndex = tracks.findIndex(
    //     ({ id }) => id.toString() === active.id,
    //   );
    //   const newIndex = tracks.findIndex(({ id }) => id.toString() === over.id);
    //   replaceTracks(arrayMove(tracks, oldIndex, newIndex).map(({ id }) => id));
    // }
  };

  return (
<PlaylistContainer>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={() => setDragging(true)}
      >
        <SortableContext
          items={orderedTracks?.map(({ localSongId }) => localSongId) || []}
          strategy={verticalListSortingStrategy}
        >
          <TableContainer>
            <AutoResizer>
              {({ width, height }) => {
                return (
                  <BaseTable
                    style={{fontSize: 12}}
                    rowKey="localSongId"
                    data={tracks?.map((track, index) => ({
                      ...track,
                      fakeId: `${track.id}_${index}`, // gnarly way to allow duplicate rows
                    }))}
                    columns={playlistColumns}
                    width={width}
                    height={height}
                    headerHeight={40}
                    rowHeight={30}
                    rowRenderer={playlistRowRenderer()}
                  />
                );
              }}
            </AutoResizer>
          </TableContainer>
          {createPortal(
            <TrackCountOverlay dragging={dragging} count={selected.length} />,
            document.body,
          )}
        </SortableContext>
      </DndContext>
    </PlaylistContainer>
  );
};

export default PlaylistBody;
