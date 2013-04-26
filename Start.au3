#Region ;**** Directives created by AutoIt3Wrapper_GUI ****
#AutoIt3Wrapper_Icon=ezb.ico
#AutoIt3Wrapper_Res_requestedExecutionLevel=asInvoker
#EndRegion ;**** Directives created by AutoIt3Wrapper_GUI ****
#include <Constants.au3>

Local $result = Run("node server.js", @WorkingDir & "/ez-bweb", @SW_HIDE, $STDERR_CHILD + $STDOUT_CHILD)

Local $line

While 1
    $line = StdoutRead($result)
    If @error Then ExitLoop
	if $line <> "" Then
		MsgBox(0, "STDOUT read:", $line)
		ExitLoop
	EndIf
WEnd

MsgBox(0, "Debug", "Exiting...")
