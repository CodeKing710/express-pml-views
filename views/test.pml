# Comments look like this

#Below is a command
@ template MAIN

#Below is how to write a webpage using pml
:head
  :title
    $title
  :styles
    ./css
  :scripts
    ./js
  :metas
    []
:body
  :header
    :nav
      :li <type=none>
        :a <href=javascript:void(0),class=nav-item>
          "Link
        :a <href=javascript:void(0),class=nav-item>
          "Link
        :a <href=javascript:void(0),class=nav-item>
          "Link
  :main
    $children
  :footer
!!